# SiVolunteer 🌟

![SiVolunteer](public/Logo-SiVolunteer.png)

**SiVolunteer** adalah platform web untuk memfasilitasi interaksi antara penyelenggara kegiatan sosial (organizer) dan relawan (volunteer). Aplikasi ini memungkinkan pengguna untuk menemukan, mendaftar, dan mengelola kegiatan sukarela dengan mudah, serta membantu penyelenggara dalam mempublikasikan acara dan mengelola partisipan.

---

## Fitur Utama ✨

- **Autentikasi & Otorisasi**
  - Login & Register (role: Volunteer, Organizer, Admin)
  - Aktivasi akun via email
- **Manajemen Event**
  - CRUD acara oleh organizer
  - Pendaftaran volunteer ke acara
  - List event publik
- **Manajemen Organizer**
  - Profil & kontak penyelenggara
  - Verifikasi data
- **Manajemen Volunteer**
  - Profil volunteer
  - Riwayat partisipasi
- **Pencarian & Filter**
  - Cari acara berdasarkan kategori, lokasi, dan tanggal
- **Upload & Manajemen Gambar**
  - Upload foto event dan profil

---

## Tech Stack 🛠️

- **Bahasa**: TypeScript 🟦
- **Framework**: Next.js ⚛️
- **UI Library**: HeroUI 🎨
- **Styling**: Tailwind CSS 💨
- **Data Fetching**: Axios, React Query ⚡
- **Validasi**: Yup ✅
- **Carousel**: Swiper 🎠
- **Icons**: React Icons 🔤
- **Notifications**: React Toastify 🔔
- **Database**: MongoDb 📝
- **Deployment**: Vercel 🌐

---

## Instalasi & Menjalankan 🚀

1.  **Clone repositori:**

    ```bash
    git clone https://github.com/Ibrhm1/SiVolunteer.App
    cd SiVolunteer.App
    ```

2.  **Install dependensi:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment:**
    Buat file .env di root direktori proyek. Isi dengan variabel lingkungan yang dibutuhkan, seperti:

    ```
    NEXT_PUBLIC_API_URL: "your_api_url"
    NEXT_AUTH_SECRET: "your_secret"
    ```

4.  **Jalankan proyek:**

    ```bash
    npm run dev
    ```

---

## Link deploy 🌐

Aplikasi yang sudah dideploy: **[SiVolunteer.App](https://si-volunteer-app.vercel.app/)**
