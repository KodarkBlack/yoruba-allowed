### Dashboard All Students Table

Below are the steps needed to actualize the JavaScript Code for the all students table

- STEP 1 - Create a function that get's all students
- STEP 2 - Get the token you stored on the localStorage.
- STEP 3 - Convert the token from it's `json` format to an `object`.
- STEP 4 - Get the _token_ value from it.
- STEP 5 - Create a new Headers() constructor and append an _Authorization_ and _Bearer_ string to it.
- STEP 6 - Create a request object that contains the neccesary `method` and `headers`.
- STEP 7 - Initialize an array literal.
- STEP 8 - Create a _URL_ variable with the link -> `https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students`
- STEP 9 - Use fetch api to get the _response_ and then add the _json()_ method on the response.
  NB: You should know how to use the fetch API now.
- STEP 10 - Get the result in the _.then()_ block and then do the following to the result
- Print the result to the console
- Get the `div` element that will contain the table from your html file using the _getElementById_ method.
- Check if the _result.length_ is equal to `0`, if it is notify the user that `No Registered Student`.
- Else if the _result.length_ is not `0`, use the _map()_ method on the result, get the empty array literal you initialized in `STEP 7` and add the code below to it ->

```js
<tr>
  <td>${item.name}</td>
  <td>${item.email}</td>
  <td>${item.phone_number}</td>
  <td>${item.position}</td>
  <td>${item.total_score}</td>
</tr>

//NB: Item is the value you used in your map() method
```

- Take the div in `STEP 10 c` and using the _innerHTML_ method add the array literal you initiated. Meaning you're adding the result of mapping the result to the new array. The items mapped from the result will be pushed into the array.
- Catch the error.
