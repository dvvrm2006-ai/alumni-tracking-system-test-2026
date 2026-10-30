export const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  alphabetical: { name: 1 },
  // 'experienced' is handled separately via the computed experienceYears field
};

/**
 * Builds a Mongo match stage from discrete filter query params
 * (used by the plain list endpoint's filter sidebar).
 */
export function buildFilterMatch(query) {
  const match = {};

  if (query.company) match.currentCompany = { $regex: escapeRegex(query.company), $options: 'i' };
  if (query.branch) match.branch = { $regex: escapeRegex(query.branch), $options: 'i' };
  if (query.location) match.location = { $regex: escapeRegex(query.location), $options: 'i' };
  if (query.graduationYear) match.graduationYear = Number(query.graduationYear);

  if (query.skills) {
    const skills = query.skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (skills.length) {
      match.skills = { $in: skills.map((s) => new RegExp(escapeRegex(s), 'i')) };
    }
  }

  return match;
}

/**
 * Builds a Mongo $or match stage from a single free-text query
 * (used by the smart search endpoint).
 */
export function buildSearchMatch(q) {
  if (!q) return {};
  const regex = { $regex: escapeRegex(q), $options: 'i' };

  const or = [
    { name: regex },
    { currentCompany: regex },
    { branch: regex },
    { location: regex },
    { skills: regex },
  ];

  // Also match an exact graduation year if the query looks like one
  if (/^\d{4}$/.test(q)) {
    or.push({ graduationYear: Number(q) });
  }

  return { $or: or };
}

/**
 * Runs a paginated, sorted aggregation over the User collection and
 * sends a consistent { success, data, pagination } response.
 */
export async function runAlumniQuery(User, res, { match, sort, page, limit, minExperience }) {
  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.max(Number(limit) || 10, 1);

  const sortStage = sort === 'experienced' ? { experienceYears: -1 } : (SORT_OPTIONS[sort] || SORT_OPTIONS.newest);

  const pipeline = [
    { $match: match },
    {
      // Extracts a leading number from the free-text "experience" field
      // (e.g. "3 years" -> 3) so "Most Experienced" sorting and the
      // minimum-experience filter work without forcing a rigid input format.
      $addFields: {
        experienceYears: {
          $convert: {
            input: { $arrayElemAt: [{ $split: [{ $ifNull: ['$experience', '0'] }, ' '] }, 0] },
            to: 'double',
            onError: 0,
            onNull: 0,
          },
        },
      },
    },
  ];

  if (minExperience) {
    pipeline.push({ $match: { experienceYears: { $gte: Number(minExperience) } } });
  }

  pipeline.push(
    { $sort: sortStage },
    {
      $facet: {
        data: [
          { $skip: (pageNum - 1) * limitNum },
          { $limit: limitNum },
          { $project: { password: 0, __v: 0, experienceYears: 0 } },
        ],
        totalCount: [{ $count: 'count' }],
      },
    }
  );

  const [result] = await User.aggregate(pipeline);
  const data = result?.data || [];
  const total = result?.totalCount?.[0]?.count || 0;

  res.status(200).json({
    success: true,
    data,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
