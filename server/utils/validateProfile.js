const urlPattern = /^https?:\/\/.+/i;

/**
 * Validates the fields a user is allowed to edit on their profile.
 * Returns an array of error strings — empty array means valid.
 */
export function validateProfileInput(body) {
  const errors = [];
  const currentYear = new Date().getFullYear();

  if (body.graduationYear !== undefined && body.graduationYear !== null && body.graduationYear !== '') {
    const year = Number(body.graduationYear);
    if (!Number.isInteger(year) || year < 1950 || year > currentYear + 10) {
      errors.push('Graduation year must be a valid year');
    }
  }

  if (body.skills !== undefined) {
    if (!Array.isArray(body.skills) || !body.skills.every((s) => typeof s === 'string')) {
      errors.push('Skills must be an array of strings');
    }
  }

  if (body.bio !== undefined && body.bio.length > 500) {
    errors.push('Bio must be 500 characters or fewer');
  }

  for (const field of ['linkedinUrl', 'githubUrl', 'portfolioUrl']) {
    if (body[field] && !urlPattern.test(body[field])) {
      errors.push(`${field} must be a valid URL starting with http:// or https://`);
    }
  }

  if (body.phone !== undefined && body.phone !== '' && !/^[\d+\-\s()]{7,15}$/.test(body.phone)) {
    errors.push('Phone number format is invalid');
  }

  return errors;
}
