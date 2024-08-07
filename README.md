# FastAPI Note-Taking App

## Key Features

- **Simple Note Management:** Create, view, and delete notes.
- **Asynchronous Operations:** Uses Celery with RabbitMQ for handling tasks asynchronously.
- **Data Caching:** Redis is used for efficient data retrieval and storage.

## Tools Used

- **Backend:** FastAPI, RabbitMQ, Celery, Redis
- **Frontend:** React, TypeScript
- **Containerization:** Docker
- **Deployment:** Google Kubernetes Engine (GKE)

## Project Setup

To set up the project locally or deploy using Docker, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akileshjayakumar/note-taking-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd note-taking-app
   ```
3. **Build Docker containers:**
   ```bash
   docker-compose up --build
   ```
4. **Access the application locally:**
   - Backend: Visit `http://localhost:8000/docs` in your web browser for API documentation.
   - Frontend: Visit `http://localhost:3000` to access the note-taking interface.

## Contributing

Your contributions are welcome! If you have ideas for improvements or new features:

1. **Fork the Repository**
2. **Create a Branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Commit Changes:**
   ```bash
   git commit -am 'Add new feature: description'
   ```
4. **Push to Branch:**
   ```bash
   git push origin feature-branch
   ```
5. **Submit a Pull Request**

## Contact

- **Email:** [jayakuma006@mymail.sim.edu.sg](mailto:jayakuma006@mymail.sim.edu.sg)
- **LinkedIn:** [Akilesh Jayakumar on LinkedIn](https://www.linkedin.com/in/akileshjayakumar/)
- **GitHub:** [Akilesh Jayakumar on GitHub](https://github.com/akileshjayakumar)
