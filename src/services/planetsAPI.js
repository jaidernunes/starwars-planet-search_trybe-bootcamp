const fetchAPI = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default fetchAPI;
