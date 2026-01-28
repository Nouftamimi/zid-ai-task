_______________________________________________________________________________________

📱 Project Architecture Overview
_______________________________________________________________________________________

This project is built using Clean Architecture to ensure scalability, maintainability, and testability as the application grows.

The architecture clearly separates UI, business logic, and data handling, making the codebase easy to extend and reason about.
_______________________________________________________________________________________

🧱 Architecture Approach

Clean Architecture

The app is divided into three main layers:

- Presentation

   UI components and screens

   No direct dependency on data sources

- Domain

   Business rules

   Entities, repositories (interfaces), and use cases

- Data

   API calls, local storage, and repository implementations

_______________________________________________________________________________________

🔁 State Management & Networking
_______________________________________________________________________________________

Redux is used for global state management

Axios is used for API communication

A centralized API client handles:

Error handling

_______________________________________________________________________________________

📂 Folder Structure
_______________________________________________________________________________________

```text
app/
├─ components/
│  └─ ProductInfo/
│     └─ ProductCard/
│        ├─ ProductCard.tsx
│        └─ styles.ts
│
├─ lib/
│  ├─ api-client/
│  ├─ apiError.ts
│  ├─ endpoints.ts
│  ├─ httpClient.ts
│  └─ interceptors.ts
│
├─ notification/
│
├─ pages/
│  ├─ home/
│  │  ├─ data/
│  │  │  ├─ mock/
│  │  │  │  └─ home.mock.json
│  │  │  └─ homeRepositoryImpl.ts
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  ├─ repositories/
│  │  │  │  └─ HomeRepository.ts
│  │  │  └─ usecase/
│  │  │     └─ homeUseCase.ts
│  │  └─ presentation/
│  │     ├─ HomeView.tsx
│  │     └─ HomeViewStyle.styles.ts
│  │
│  ├─ order/
│  │  ├─ data/
│  │  │  ├─ __tests__/
│  │  │  ├─ mock/
│  │  │  │  └─ order.mock.json
│  │  │  └─ orderRepositoryImpl.ts
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  ├─ repositories/
│  │  │  │  └─ OrderRepository.ts
│  │  │  └─ usecase/
│  │  │     └─ orderUseCase.ts
│  │  └─ presentation/
│  │     ├─ OrderView.tsx
│  │     └─ OrderViewStyle.styles.ts
│  │
│  ├─ product/
│  │  ├─ data/
│  │  │  ├─ __tests__/
│  │  │  ├─ mock/
│  │  │  │  └─ product.mock.json
│  │  │  └─ productRepositoryImpl.ts
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  ├─ repositories/
│  │  │  │  └─ productRepository.ts
│  │  │  └─ usecase/
│  │  │     └─ productUseCase.ts
│  │  └─ presentation/
│  │     ├─ productView.tsx
│  │     └─ productViewStyle.styles.ts
│  │
│  ├─ AICopilot/
│  │  ├─ data/
│  │  │  ├─ __tests__/
│  │  │  ├─ aiCopilotRepositoryImpl.ts
│  │  │  ├─ aiActionExecutor.ts
│  │  │  ├─ aiContextProvider.ts
│  │  │  └─ aiConversationManager.ts
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  │  ├─ AICopilotAction.ts
│  │  │  │  ├─ ChatMessage.ts
│  │  │  │  └─ OpenAIResponse.ts
│  │  │  ├─ repositories/
│  │  │  │  └─ aiCopilotRepository.ts
│  │  │  └─ usecase/
│  │  │     └─ aiCopilotUseCase.ts
│  │  └─ presentation/
│  │     ├─ aiCopilotView.tsx
│  │     └─ aiCopilotViewStyle.styles.ts
│
├─ utils/
│
├─ database/
│  ├─ index.ts              # Realm
│  ├─ schemas/
│  │  └─ ChatMessageSchema.ts
│  └─ migrations.ts
```

 
_______________________________________________________________________________________

🧠 AI Copilot Integration
_______________________________________________________________________________________

Uses OpenAI API for chat and AI-driven actions

Cleanly separated using the same data / domain / presentation pattern

Supports:

Conversation management

Context handling

Action execution

_______________________________________________________________________________________

🌐 RTL & Bilingual Support
_______________________________________________________________________________________

The application supports both LTR and RTL layouts to handle bilingual use cases. RTL handling focuses on correct UI alignment and layout behavior. 


⭕️ Kindly note that mock data has not been translated, as the main focus is on frontend alignment and layout validation.

_______________________________________________________________________________________

📦 Offline Support & Data Persistence
_______________________________________________________________________________________

The app uses Realm database for offline support and data persistence. Realm is well suited for e-commerce applications due to its fast performance, reliable local storage, and ability to keep critical data (such as products, orders, and chat state) available even when the app is offline.

_______________________________________________________________________________________

🔔 Notifications
_______________________________________________________________________________________

The application includes simulated notifications for order and product updates. 

🧪 To test the notifications are displayed when the user navigates to the corresponding order or product views, allowing the notification flow to be demonstrated and validated.

Please note that this is a simulated implementation. For a scalable production setup, notifications should be integrated with the backend to automatically trigger push notifications based on real-time order or product events.

_______________________________________________________________________________________

🧪 Unit tests
_______________________________________________________________________________________

For your AI Copilot, the highest-value tests are:
1- Use case logic
2- Builds conversation context
3- Calls repository
4- Executes AI actions
5- Returns correct human-readable message
6- Action parsing
7- JSON → action
8- Invalid JSON → ignored
9- Action execution
10- Updates order status
11- Returns correct confirmation text

_______________________________________________________________________________________

🚀 Production Scalability & Environment Strategy
_______________________________________________________________________________________

The app is designed to scale to production with three environments: development, preview, and production. Each environment uses its own API configuration and keys managed through Expo environment variables. A CI/CD pipeline is used to automate builds and releases, allowing safe testing in non-production environments before deploying to the App Store. 

- The production build is connected to live APIs and has been successfully uploaded to app store.

_______________________________________________________________________________________

👀 Take a peek on a real device (screenshots below)
_______________________________________________________________________________________


iOS complete tour of the app 

https://github.com/user-attachments/assets/d708fe66-a3ed-4016-8cf4-d60ec0ab57bb


_______________________________________________________________________________________

Android complete tour of the app 

https://github.com/user-attachments/assets/4674a063-4408-4620-94da-250d70271830

_______________________________________________________________________________________

AI chatting

https://github.com/user-attachments/assets/eb7d955d-dcdd-4744-8f2b-7bf35dd97869


_______________________________________________________________________________________

Run unit test

https://github.com/user-attachments/assets/406f5a68-ec91-4218-a204-275039de8c09





