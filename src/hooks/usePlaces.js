import useSWR from "swr";

const fetchPlacess = async ({ place }) => {
    if (place) return [];
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fetch("http://139.162.167.224:3000/stories").then(res => res.json());
};

const filter = async ({ place, radius }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return fetch(`http://139.162.167.224:3000/stories?city=${place}&radius=${radius}`).then(res => res.json());
};

export const usePlaces = () => {
    const { data, isLoading } = useSWR("useplaces", fetchPlacess);
    return { places: data, isLoading };
};

export const useFilter = ({ place, radius }) => {
  const { data, isLoading } = useSWR({ place, radius }, filter);
  return { filteredPlaces: data, isLoading };
};
