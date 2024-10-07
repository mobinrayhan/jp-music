"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('querySearch') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  const updateQueryParam = useCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('querySearch', value);
    } else {
      params.delete('querySearch');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    updateQueryParam(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateQueryParam]);

  return (
    <section className="my-4 bg-gray-200">
      <div className="custom-container">
        <input
          type="text"
          placeholder="Search your sound effects"
          className="w-full border-none bg-gray-200 px-3 py-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </section>
  );
}
