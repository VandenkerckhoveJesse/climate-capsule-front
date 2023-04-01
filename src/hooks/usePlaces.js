import useSWR from "swr";

const fetchPlacess = async ({ place, radius }) => {
    if (place) return [];
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fetch("http://139.162.167.224:3000/stories").then(res => res.json());
};

export const usePlaces = ({ place, radius }) => {
    const { data, isLoading } = useSWR({ place, radius }, fetchPlacess);
    return { places: data, isLoading };
};
