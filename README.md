# Shop web app

![s](https://user-images.githubusercontent.com/65632008/85959049-81dd0a00-b95f-11ea-9b24-0310a1cd896c.gif)

# Description

This is a simple shopping mall webpage created by React.

When signing up and logging in, the verification function was based on the react library [yup](https://www.npmjs.com/package/yup) and [Formik](https://jaredpalmer.com/formik/), and ui design was used [Ant Design](https://ant.design/).

The logged-in user can click the "Add to cart" button to add it to their own cart and upload photos and details of the products they want to sell.

In the basket menu, you can remove the product which you add to cart.

The purchasing function is using the test api provided by Paypal, and if the purchase is successful, the purchase history is added to the history menu.

I used react-redux to implement membership, purchase, history of purchase and mongDB and expressJS to implement DB storage and server functions.

[multer](https://www.npmjs.com/package/multer) which is middleware library of Node JS was used to implement the file upload function, and [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) was used to resolve the cross-communication between the client app and the back-end app.

Used skill

- ReactJS
- React-Redux
- HTML
- CSS
- MongoDB
- expressJS

<hr />

# Issue

Currently, the app is operating normally on local system, however errors are occurring when registering images on the Heroku Web site because the filesystem on Heroku is not suitable for persistent storage of data after deploy through Heroku. I will solve this problem using AWS S3 or Heroku addon.

<hr/>

# Website

[sct-shop](https://sct-shop.herokuapp.com/)

<hr/>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
