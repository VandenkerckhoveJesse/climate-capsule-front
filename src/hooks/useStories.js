import useSWR from "swr";

const SERVER_IP = "http://139.162.167.224:3000";

export const useStories = () => {
    const { data, isLoading, mutate } = useSWR("stories", () => {
        return fetch(`${SERVER_IP}/stories`).then(res => res.json());
    });

    const addStory = async newStory => {};

    return { stories: data, isLoading, addStory };
};

export const useFilteredStories = ({ place, radius }) => {
    const { data, error, mutate } = useSWR(["filteredStories", place, radius], async ([_, place, radius]) => {
        let url = `${SERVER_IP}/stories`;
        if (place) url += `?city=${place}&radius=${radius}`;
        return fetch(url).then(res => res.json());
    });

    return {
        filteredStories: data ?? [],
        isLoading: !data && !error,
        error,
        revalidate: () => mutate(),
    };
};
