
# QuizMastro 🎓🧠

**QuizMastro** is a dynamic and responsive **Quiz Application** built with **React** and **Tailwind CSS**. It supports both **Admin** and **Student** roles, featuring dynamic quiz creation, timed assessments, grading, and result review.

---

## 📽️ Demo (Video Walkthrough)

Since the project isn't deployed yet, you can [watch the demo on Google Drive](https://drive.google.com/file/d/12XjCk2qrLCmSchE_D6gEJ2PB43tiK2Dg/view?usp=drive_link).

---
![](https://github.com/anasabdelhakim/Quiz-app/blob/main/public/quizmastro-app.png?raw=true)

## ✨ Features

### 🔐 Authentication
- Simple role-based login (Admin / Student)
- Login control without external authentication providers

### 👨‍🏫 Admin Dashboard
- Create quizzes dynamically
- Add MCQ or written questions
- Define quiz duration and start time
- Grade written answers
- Delete or manage quizzes

### 👨‍🎓 Student Panel
- View upcoming or active quizzes
- Attempt quizzes with real-time countdown
- Navigate between questions
- Auto-save progress and prevent multiple attempts
- See grades and review answers after grading

---

## 🧰 Tech Stack

- ⚛️ **React**
- 💨 **Tailwind CSS**
- 🌐 **React Router v6**
- 🧠 **Context API + useReducer** (for global state management)
- ✅ **Zod + React Hook Form** (form schema validation)
- 🧩 **Lucide Icons** (for modern, beautiful icons)
- 🧱 **Radix UI** (for accessible UI primitives)
- 💾 **LocalStorage** (for quiz persistence across reloads)

---

## 📦 Installation

Clone and run the project locally:

```bash
git clone https://github.com/your-username/quizmastro.git
cd quizmastro
npm install
npm run dev
````

---

## 🗂️ Folder Structure (Simplified)

```
/src
  ├── components/         # Reusable UI components (buttons, quiz card, etc.)
  ├── pages/              # Route-level components (Login, Admin, Student)
  ├── context/            # AuthContext, AdminContext, StudentContext
  ├── hooks/              # Custom hooks
  ├── utils/              # Validation schemas, helpers
  ├── App.tsx             # Root component with routing
  └── main.tsx            # Entry point
```

---

## ✅ Packages Used

* **react-router-dom** – Client-side routing
* **lucide-react** – Icon library
* **@radix-ui/react-primitive** – Accessible UI components
* **react-hook-form** – Form handling
* **zod** – Schema validation
* **clsx** – Conditional classNames
* **tailwindcss-animate** – Smooth UI transitions

---

## 🧪 Future Improvements

* [ ] Connect to Supabase / Firebase for persistent backend
* [ ] Enable image/file upload for questions
* [ ] Add user analytics & reports
* [ ] Deploy live on Vercel or Netlify

---

## 🤝 Contributing

Pull requests and feedback are always welcome!
Please fork the repo and submit a PR or open an issue.

---

## 📜 License

Licensed under the MIT License.

---

## 👤 Author

**Anas Abdelhakim**
🔗 [LinkedIn](https://www.linkedin.com/in/anas-abdelhakim-548aa5268)
🐙 [GitHub](https://github.com/anasabdelhakim)


