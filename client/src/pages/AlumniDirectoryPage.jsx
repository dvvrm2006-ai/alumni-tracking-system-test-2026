import { useEffect, useState } from 'react';
import { fetchAlumniList, searchAlumniList } from '@/services/alumniService';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from '@/components/alumni/SearchBar';
import FilterSidebar from '@/components/alumni/FilterSidebar';
import SortDropdown from '@/components/alumni/SortDropdown';
import AlumniCard from '@/components/alumni/AlumniCard';
import AlumniCardSkeleton from '@/components/alumni/AlumniCardSkeleton';
import EmptyState from '@/components/alumni/EmptyState';
import Pagination from '@/components/alumni/Pagination';

const emptyFilters = { company: '', branch: '', graduationYear: '', location: '', skills: '', experience: '' };

export default function AlumniDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const [alumni, setAlumni] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Reset to page 1 whenever the search term, filters, or sort change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, sort]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const result = debouncedSearch
          ? await searchAlumniList({ q: debouncedSearch, sort, page, limit: 10 })
          : await fetchAlumniList({ ...filters, sort, page, limit: 10 });

        if (!cancelled) {
          setAlumni(result.data);
          setPagination(result.pagination);
        }
      } catch {
        if (!cancelled) setError('Could not load the alumni directory. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, filters, sort, page]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Alumni Directory</h1>
        <p className="text-slate-500 text-sm">Browse, search, and connect with graduates across every batch.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(emptyFilters)}
        />

        <div>
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <AlumniCardSkeleton key={i} />)
              : alumni.length === 0
              ? <EmptyState />
              : alumni.map((alumnus) => <AlumniCard key={alumnus._id} alumnus={alumnus} />)}
          </div>

          {!loading && (
            <Pagination
              page={pagination.page || page}
              totalPages={pagination.totalPages || 1}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
