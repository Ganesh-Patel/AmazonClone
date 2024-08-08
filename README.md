# E-Commerce Platform - Amazon Clone

## Overview

Welcome to the E-Commerce Platform, a fully functional Amazon Clone project developed during the Geekathon event held by Geekster from 3rd August to 9th August. This platform allows users to browse through various product categories, filter products based on brands, ratings, and prices, search for specific items, and add them to the cart. The project integrates Firebase for authentication and Razorpay for payment processing, ensuring a secure and seamless shopping experience.

## Features

- **Authentication:** Secure user authentication using Firebase. Cart data is also stored with the user profile.
- **Responsive Landing Page:** A visually appealing, responsive landing page inspired by Amazon's design.
- **Product Listings & Search:** Products are listed using the Amazon Product Data API, with a robust search feature to find items quickly.
- **Filters:** Users can filter products by category, brand, price range, and rating.
- **Carousels:** Product images and offers are displayed using carousels for better user engagement.
- **Add to Cart & Bill Summary:** Users can add products to their cart, view a detailed bill summary, and proceed to checkout.
- **Payment Integration:** Integrated Razorpay for payment processing. Payments can only be made after successful authentication.
- **Toast Notifications:** Real-time notifications using Toaster for better user experience.

## Demo

### Demo Video
[Watch the Demo Video](#) 

### Hosted Link
[Visit the Live Site](https://amazon-clone-ashen-phi.vercel.app/) 

### Images
![Landing Page](https://github.com/user-attachments/assets/96ea911b-c127-4722-a3e6-e6b7571d96f9)
![Product Listings](https://github.com/user-attachments/assets/1a002a13-cb74-44e5-be46-6465942d2851)
![Cart Summary](https://github.com/user-attachments/assets/223b7053-7a25-4a73-b27a-0dbcda362804) 

## API Integration

- **Amazon Product Data API**: Used for fetching real-time product data.
  - API Documentation: [Real-Time Amazon Data](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data/playground/apiendpoint_17991940-c656-454f-a9ee-0277b0ada11d)
  - API Example: [Amazon Product Data](https://rapidapi.com/opus-serve-opus-serve-default/api/amazon-product-data6)

- **Payment Integration**: Razorpay is used for handling payments.
  - API Documentation: [Razorpay API](https://razorpay.com/docs/api/)

*Note: API calls are limited, so the project primarily works with JSON data for development. API calls are implemented during the final stage.*

## Technologies Used

- **Frontend:** React, Redux, Context API, useState, useRef, useEffect, CSS Modules
- **Backend & Authentication:** Firebase
- **Payment Gateway:** Razorpay
- **State Management:** Redux
- **UI Components:** Carousels, Toast Notifications, Responsive Design
- **Others:** React Router, Axios for API calls

## Installation & Setup

### Prerequisites
- Node.js installed
- Firebase account
- Razorpay account
- API keys for Amazon Product Data API

### Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/ecommerce-platform.git
    cd ecommerce-platform
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Setup Firebase**
   - Create a Firebase project and add the Firebase SDK to your React app.
   - Configure Firebase authentication (email/password).
   - Store your Firebase credentials in a `.env` file.

4. **Setup Razorpay**
   - Register for a Razorpay account and obtain the API keys.
   - Integrate Razorpay into your checkout component.

5. **Configure API Keys**
   - Create a `.env` file in the root directory and add your API keys.
   ```env
   REACT_APP_AMAZON_API_KEY=your_amazon_api_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_RAZORPAY_KEY=your_razorpay_key
   ```

## Run the Application

```bash
npm start
```
## Deployment

The application is deployed on [Vercel] (Replace with the appropriate hosting link).

## Extra Features Implemented

- **Search Functionality**: Enhanced search functionality to find products based on keywords.
- **Advanced Filters**: Users can filter products not only by price and rating but also by categories and brands.
- **Responsive Design**: Ensured the platform is fully responsive and mobile-friendly.
- **Toast Notifications**: Added real-time notifications for user interactions, like adding items to the cart or completing payments.

## Contribution

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

## Acknowledgments

- **Geekster** for organizing the Geekathon event.
- **RapidAPI** for providing the Amazon Product Data API.
- **Firebase** for authentication services.
- **Razorpay** for payment gateway integration.
- Special thanks to the developers whose tutorials and resources helped in building this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

