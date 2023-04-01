import useSWR from "swr";

const SERVER_IP = "http://139.162.167.224:3000";

export const usePlaces = () => {
    const { data, isLoading } = useSWR("places", () => {
        return fetch(`${SERVER_IP}/stories`).then(res => res.json());
    });

    return { places: data, isLoading };
};

export const useFilteredPlaces = ({ place, radius }) => {
    const { data, isLoading } = useSWR(["filteredPlaces", { place, radius }], async ([_, { place, radius }]) => {
        return fetch(`${SERVER_IP}/stories?city=${place}&radius=${radius}`).then(res => res.json());
    });

    console.log("hadii", data);
    return { filteredPlaces: data, isLoading };
};
