# 📝 FistBlog - Backend (Node.js & Express REST API)

FistBlog Backend, Node.js, Express ve MongoDB (Mongoose) mimarisi kullanılarak geliştirilmiş, dinamik bir blog ve yorum yönetimi RESTful API servisidir. Ön yüz (frontend) uygulamalarının blog gönderilerini listelemesine, yeni içerik ve görsel eklemesine, var olan gönderileri silmesine ve gönderilere özel yorum yönetimi yapabilmesine imkan tanır.

---

## 🚀 Öne Çıkan Özellikler

* **Gönderi (Post) Yönetimi:**
  * Tüm blog gönderilerini MongoDB veritabanından çekme ve JSON formatında sunma.
  * Tekil gönderi detaylarını ID bazlı sorgulama.
  * Base64 görsel verisi içeren yeni blog gönderisi oluşturma.
  * ID ile belirtilen blog gönderisini veritabanından silme.
* **Yorum (Comment) Yönetimi:**
  * İlgili gönderiye (`postId`) ait tüm yorumları `populate` kullanarak ilişkilendirilmiş şekilde getirme.
  * Belirli bir gönderiye yeni yorum ekleme ve gönderi verisindeki yorum referanslarını güncelleme.
  * Yorum silme işlemi sonrasında ana gönderinin yorum listesinden referansı temizleme (`pull`).
* **Veritabanı İlişkilendirmesi (Data Modeling):**
  * Mongoose şemaları üzerinden `Post` ve `Comment` modelleri arasında bire-çok (1-N) ilişki kurulumu.
* **CORS ve Güvenlik Yapılandırması:**
  * Tüm kökenlerden (Cross-Origin) gelen isteklere izin veren esnek CORS ve başlık (header) yönetimi.
  * `body-parser` ile 30MB limitli büyük veri (Base64 görseller) işleme kapasitesi.

---

## 📁 Proje Klasör Yapısı

```text
enes-sen-backend-blog/
├── index.js                  # Uygulama giriş noktası, sunucu ve veritabanı bağlantısı
├── package.json              # Bağımlılıklar ve proje bağımlılık tanımları
├── controllers/
│   ├── blogcontroller.js     # Gönderi CRUD işlemlerini yöneten kontrolcü
│   └── comentcontroller.js   # Yorum CRUD işlemlerini yöneten kontrolcü
├── models/
│   ├── comment.js            # Mongoose Yorum (Comment) Şeması
│   └── post.js               # Mongoose Gönderi (Post) Şeması
└── router/
    ├── commentroutes.js      # Yorum API rotaları
    └── routes.js             # Ana API rotalandırma ve ara yazılımlar

[ API Client ]
                                     │
                                     ▼ (sends requests)[cite: 11]
      ┌──────────────────────────────────────────────────────────────┐
      │                         API Runtime                          │
      │  ┌────────────────────────────────────────────────────────┐  │
      │  │                Express Server (index.js)               │  │
      │  └───────────────────────────┬────────────────────────────┘  │
      │                              │ (mounts routes)[cite: 11]    │
      │                              ▼                               │
      │  ┌────────────────────────────────────────────────────────┐  │
      │  │                   API Routes (routes.js)               │  │
      │  └───────────────────────────┬────────────────────────────┘  │
      │                              │ (mounts comments)[cite: 11]  │
      │                              ▼                               │
      │  ┌────────────────────────────────────────────────────────┐  │
      │  │             Comment Routes (commentroutes.js)          │  │
      │  └────────────────────────────────────────────────────────┘  │
      └──────────────────────────────┬───────────────────────────────┘
                                     │
            ┌────────────────────────┴────────────────────────┐
            │ (dispatches posts)[cite: 11]                   │ (dispatches comments)[cite: 11]
            ▼                                                 ▼
┌─────────────────────────┐                       ┌─────────────────────────┐
│     Blog Operations     │                       │    Comment Operations   │
│  (blogcontroller.js)    │                       │   (comentcontroller.js) │
└───────────┬─────────────┘                       └───────────┬─────────────┘
            │                                                 │
            │ (reads & writes)[cite: 11]                     │ (reads, updates, creates, deletes)[cite: 11]
            ▼                                                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                             Data Persistence                              │
│   ┌──────────────┐             ┌─────────────┐           ┌────────────┐   │
│   │   MongoDB    │◄────────────┤ Post Model  │           │  Comment   │   │
│   │ (Database)   │ (connects)  │  (post.js)  │           │   Model    │   │
│   └──────────────┘[cite: 11]  └─────────────┘           └────────────┘   │
└───────────────────────────────────────────────────────────────────────────┘
