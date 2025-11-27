import getListItems from '@/api/getListItem';
import { create } from 'zustand'

export const useStore = create((set, get) => ({
    repoData: [],
    filteredData: [],
    currPage: 1,
    isLoading: true,
    isFiltered: false,
    error: null,
    
    addRepoData: async () => {
        set({ isLoading: true });

        try {
            const state = get(); 
            const { currPage } = state;

            if (currPage === 1) {
                const localRaw = localStorage.getItem("gitTData");
                if (localRaw) {
                    const localData = JSON.parse(localRaw);
                  
                    if (Array.isArray(localData) && localData.length > 0) {
                        set((s) => ({
                            repoData: localData,
                            filteredData: s.isFiltered ? s.filteredData : localData,
                            isLoading: false,
                        }));
                        return;
                    }
                }
            }

            const response = await getListItems(currPage);

            if (response?.error) {
                set({ error: response.error?.message ?? "Fetch error", isLoading: false });
                return;
            }

            const incoming = Array.isArray(response?.data?.items) ? response.data.items : [];
            set((s) => {
                const existing = s.repoData ?? [];

                const map = new Map();
                for (const item of existing) {
                    map.set(item.id ?? JSON.stringify(item), item);
                }
                for (const item of incoming) {
                    const key = item.id ?? JSON.stringify(item);
                    if (!map.has(key)) map.set(key, item);
                }

                const merged = Array.from(map.values());
                if (currPage === 1 && incoming.length > 0) {
                    try {
                        localStorage.setItem("gitTData", JSON.stringify(incoming));
                    } catch (e) {
                    }
                }

                return {
                    repoData: merged,
                    filteredData: s.isFiltered ? s.filteredData : merged,
                    isLoading: false,
                };
            });
        } catch (err) {
            set({ error: err?.message ?? "Unknown error", isLoading: false });
        }
    },
    updatePageNo: () => {
        set(state => ({ ...state, currPage: state.currPage + 1 }))
    },
    filterRepoData: (query) => {
        set(state => {
            const filtered = state.repoData.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            return { ...state, filteredData: filtered, isFiltered: true }
        })
    },
    sortRepoData: (query) => {
        set(state => {
            let sortedData = [];
            if (query === "char") {
                sortedData = state.repoData.sort((a, b) => a.name[0].localeCompare(b.name[0]));
            }
            if (query === 'stars') {
                sortedData = state.repoData.sort((a, b) => b.stargazers_count - a.stargazers_count);
            }
            if (query === 'recent') {
                sortedData = state.repoData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            }
            return { ...state, repoData: sortedData }
        })
    },
    clearFilterData: () =>
        set((state) => ({
            filteredData: [],
            isFiltered: false,
        })),
    updatePage: () => set((state) => ({ ...state, currPage: state.currPage + 1 })),
    setIsLoading: () => set((state) => ({ ...state, isLoading: true }))
}))
