## Hacktiv-Overflow

#### List of basic routes:

| Route          | HTTP | Header(s) | Body                                | Description                                                  |
| -------------- | ---- | --------- | ----------------------------------- | ------------------------------------------------------------ |
| user/register      | POST | none      | email: String<br />password: String | Create a user (role auto user)<br />success:<br />(201), example: {"_id": String, "name": String, "email": String, "password": String,, "watchTags": [String, String, etc]}<br />errors:<br />(500), error |
| user/login         | POST | none      | email: String<br />password: String | Login and get token based on credentials<br />success:<br />(200), example: {"_id": String, "name": String, "email": String, "password": String,  "token": String}<br />errors:<br />(400), {message: 'Invalid email/password'}<br />(500), error |
| /user/getdata             | GET    | Authenticated:<br />(token),<br />| none              | Get users info <br />success:<br />(200), example: [{"_id": String, "name": String, "email": String, "password": String, "watchTags": [String, String, etc]}br />errors:<br />(500), error |
| /user/watchedtag     | Post | <br />(token),(check isUser) | tag: String | Update a user watchtag with new tag<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'tag sudah ada'}<br />(500), error |




#### List of question routes:

| Route                            | HTTP   | Header(s)                                                    | Body                                                         | Description                                                  |
| -------------------------------- | :----- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /question                       | GET    | Authenticated:<br />(token)                                  | none                                                         | Get all questions<br />success:<br />(200), example: [{"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}, {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}, etc]<br />errors:<br />(500), error |
| /question/:questionId           | GET    | Authenticated:<br />(token)                                  | none                                                         | Get a single question info<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /question/                 | POST   | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />tags: [String, String] | Create a question<br />success:<br />(201), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /question/:id/:questionId       | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />tags: [String, String] | Update a question with new info<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |
| /question/downvotes/:questionId | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | status: String                                               | Update votes of question<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |
| /question/:id/:questionId       | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | none                                                         | Delete a question<br />success:<br />(200), example: {message: 'Question successfully deleted'}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |



#### List of answer routes:

| Route                        | HTTP   | Header(s)                                                    | Body                                                         | Description                                                  |
| ---------------------------- | :----- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /answers/:questionId         | GET    | Authenticated:<br />(token)                                  | none                                                         | Get answer by questionId<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(500), error |
| /answers/:id/:questionId     | POST   | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />questionId: String | Create a answer<br />success:<br />(201), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /answers/:id/:answerId       | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | title: String<br />description: String                       | Update a answer with new info<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |
| /answers/:id/votes/:answerId | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | status: String                                               | Update votes of answer<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |
| /answers/:id/:answerId       | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | none                                                         | Delete a answer<br />success:<br />(200), example: {message: 'Answer successfully deleted'}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |



#### List of tag routes:

| Route | HTTP | Header(s)                   | Body | Description                                                  |
| ----- | :--- | :-------------------------- | ---- | ------------------------------------------------------------ |
| /tags | GET  | Authenticated:<br />(token) | none | Get all tags<br />success:<br />(200), example: [{"name": String}, {"name": String}, etc]<br />errors:<br />(500), error |



### Link Deploy

Server:

server-stuckoncode.mri.web.id



Client:
stuckoncode.mri.web.id

