import useSWR from "swr";

const SERVER_IP = "http://139.162.167.224:3000";

export const usePlaces = () => {
    const { data, isLoading } = useSWR("places", () => {
        return fetch(`${SERVER_IP}/stories`).then(res => res.json());
    });

    return { places: data, isLoading };
};

export const useFilteredPlaces = ({ place, radius }) => {
    const { data, error } = useSWR(["filteredPlaces", place, radius], async ([_, place, radius]) => {
        let url = `${SERVER_IP}/stories`;
        if (place) url += `?city=${place}&radius=${radius}`;
        return fetch(url).then(res => res.json());
    });

    return { filteredPlaces: data ?? [], isLoading: !data && !error, error };
};
