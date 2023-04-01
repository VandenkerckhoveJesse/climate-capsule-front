import useSWR from "swr";

const generateRandomName = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const DUMMY_SUGGESTIONS = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: generateRandomName(),
}));

const fetchSuggestions = async searchText => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return DUMMY_SUGGESTIONS.filter(suggestion => suggestion.name.toLowerCase().includes(searchText.toLowerCase()));
};

export const useSuggestions = searchText => {
    const { data, isLoading } = useSWR(searchText ?? null, fetchSuggestions);
    return { suggestions: data, isLoading };
};
