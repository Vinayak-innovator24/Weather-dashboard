# Managing API rate limits is important to avoid being temporarily blocked from using the API and to ensure responsible usage of the service. If we hit API rate limit, following steps can be taken:

1. Rate Limiting in the Application: Implementing rate limiting in the application ensures that we don't exceed the allowed requests per minute or per hour. This can be done by tracking the number of requests made by the user and waiting for the rate limit window to reset.

2. Caching: Implementing caching for API responses can also reduce the chances of hitting API rate limit. If request for same data is made frequently, we can cache the responses and serve them from the cache instead of making repeated requests.

3. Optimizing the Requests: Reviewing our application's code to see if API requests can be reduced. For example, we can request multiple pieces of information in a single API call if the service supports it, rather than making separate requests for each piece of data.

# Handling API errors or cases where city names couldn't be found is an essential part of creating user-friendly weather dashboard. Here are some steps which I took to handle these scenarios effectively:

1. Checking API Responses: Started by inspecting the responses from the weather API. Most APIs provide specific error codes or messages in their responses when an error occurs or when a city name is not found. Looking for these indicators in the API responses will solve most of our errors.

2. Error Handling in Code:In my code, I am checking the API response for errors or cases where the city is not found. Depending on the API, this could be indicated by a specific HTTP status code or a field in the response JSON. For example, the OpenWeatherMap API might return a 404 status code for a city not found.

The code snippet is below:
if (response.status === 404) {
  // Handled the case where the city is not found
  console.error('City not found');
} else if (response.status !== 200) {
  // Handled other API errors
  console.error('API error:', response.statusText);
} else {
  // Processed the weather data when there are no errors
}
