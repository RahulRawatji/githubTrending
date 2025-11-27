import create from "zustand";

export const useStore = create((set) => ({
    repoData: [],
    filteredData: [],
    currPage: 1,
    isLoading: true,
    isFiltered: false,

    addRepoData: (data) => {
        set(state => ({ ...state, repoData: data, isLoading: false }))
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
    sortRepoData:(query)=>{
        set(state=>{
            let sortedData = [];
            if(query === "char"){
                sortedData = state.repoData.sort((a,b)=>a.name[0].localeCompare(b.name[0]));
            }
            if(query === 'stars'){
                sortedData = state.repoData.sort((a,b)=>b.stargazers_count - a.stargazers_count);
            }
            if(query === 'recent'){
                 sortedData = state.repoData.sort((a,b)=>new Date(b.updated_at) - new Date(a.updated_at));
            }
            return { ...state, repoData: sortedData }
        })
    },
    clearFilterData: () =>
        set((state) => ({
            filteredData: [],
            isFiltered: false,
        })),
}))
