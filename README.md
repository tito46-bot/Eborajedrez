# ♞ Eborajedrez - Aplicación de Ajedrez Online

Aplicación de ajedrez online para que los miembros del club Eborajedrez jueguen entre sí en tiempo real.

## 🎯 Características

- ♞ Tablero de ajedrez interactivo con interfaz intuitiva
- 👥 Sistema de búsqueda de oponentes del club
- ⚡ Juego en tiempo real con WebSockets (Socket.io)
- 📊 Sistema de rating ELO automático
- 💬 Chat integrado durante las partidas
- 📈 Historial completo de partidas
- 🏆 Rankings y estadísticas de jugadores
- 🔐 Autenticación segura con JWT
- 📱 Interfaz responsive (web)

## 🛠 Stack Tecnológico

### Backend
- **Node.js + Express.js** - Servidor HTTP
- **Socket.io** - Comunicación en tiempo real
- **MongoDB + Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación segura
- **Bcryptjs** - Hash de contraseñas
- **Chess.js** - Lógica de ajedrez validada

### Frontend
- **React 18+** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Socket.io Client** - Cliente WebSocket

## 📦 Requisitos

- **Node.js** v16+ 
- **npm** o **yarn**
- **MongoDB** (local o MongoDB Atlas)
- Git

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tito46-bot/eborajedrez.git
cd eborajedrez
```

### 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eborajedrez
JWT_SECRET=tu_clave_super_secreta_aqui_cambiar_en_produccion
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Iniciar servidor:

```bash
npm run dev
```

El backend estará en: `http://localhost:5000`

### 3️⃣ Configurar Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

La app se abrirá en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
eborajedrez/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js          # Schema de usuario
│   │   │   └── Game.js          # Schema de partida
│   │   ├── routes/
│   │   │   ├── auth.js          # Autenticación
│   │   │   ├── users.js         # Gestión de usuarios
│   │   │   └── games.js         # Gestión de partidas
│   │   ├── middleware/
│   │   │   └── auth.js          # Middleware de autenticación
│   │   └── app.js               # Configuración de Express
│   ├── server.js                # Punto de entrada
│   ├── .env.example             # Template de variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Página principal
│   │   │   ├── Game.tsx         # Pantalla de juego
│   │   │   ├── Profile.tsx      # Perfil de usuario
│   │   │   ├── Login.tsx        # Iniciar sesión
│   │   │   └── Register.tsx     # Registro
│   │   ├── components/
│   │   │   ├── Navbar.tsx       # Barra de navegación
│   │   │   ├── ChessBoard.tsx   # Tablero de ajedrez
│   │   │   └── ChatBox.tsx      # Chat en tiempo real
│   │   ├── utils/
│   │   │   ├── api.ts           # Cliente Axios
│   │   │   └── socket.ts        # Cliente Socket.io
│   │   ├── App.tsx              # Componente raíz
│   │   ├── index.tsx            # Entrada React
│   │   └── index.css            # Estilos globales
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── .gitignore
```

## 🎮 Cómo Usar

### Primer Uso

1. **Registrarse**
   - Ve a `/register`
   - Completa: usuario, email, contraseña
   - Haz clic en "Crear Cuenta"

2. **Iniciar Sesión**
   - Ve a `/login`
   - Ingresa email y contraseña
   - Se guardará el token automáticamente

3. **Jugar**
   - Haz clic en "Nueva Partida"
   - Busca un oponente disponible
   - ¡A jugar! Mueve tus piezas

4. **Ver Perfil**
   - Accede a tu perfil
   - Mira tu rating, estadísticas y ranking

## 🔐 API REST Endpoints

### Autenticación
```
POST   /api/auth/register    - Registrar nuevo usuario
POST   /api/auth/login       - Iniciar sesión
```

### Usuarios
```
GET    /api/users/:id        - Obtener perfil
PUT    /api/users/:id        - Actualizar perfil
GET    /api/users/ranking/top - Top 10 jugadores
GET    /api/users/           - Usuario actual (requiere token)
```

### Partidas
```
POST   /api/games/create            - Crear partida
GET    /api/games/:gameId           - Obtener partida
POST   /api/games/:gameId/move      - Registrar movimiento
POST   /api/games/:gameId/end       - Finalizar partida
GET    /api/games/user/:userId      - Historial del usuario
```

## 🔌 WebSocket Events

**Cliente → Servidor:**
- `user_join` - Conectar usuario
- `join_game` - Unirse a partida
- `make_move` - Enviar movimiento
- `chat_message` - Enviar mensaje

**Servidor → Cliente:**
- `users_online` - Usuarios conectados
- `player_joined` - Jugador se unió
- `move_made` - Movimiento realizado
- `receive_message` - Mensaje recibido
- `game_finished` - Partida terminada

## 🎓 Ejemplo de Flujo Completo

```typescript
// 1. Usuario se registra
POST /api/auth/register
{
  "username": "ajedrezista",
  "email": "user@example.com",
  "password": "12345678",
  "nombre": "Juan",
  "apellido": "García"
}

// 2. Inicia sesión
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "12345678"
}
// Recibe: { token, usuario }

// 3. Crea partida
POST /api/games/create
Headers: Authorization: Bearer {token}
{
  "opponentId": "id_del_oponente",
  "timeControl": "blitz_5"
}

// 4. Conecta a WebSocket y se une
socket.emit('join_game', { gameId, userId })

// 5. Realiza movimiento
socket.emit('make_move', { gameId, move: 'e2e4', userId })

// 6. Finaliza partida
POST /api/games/{gameId}/end
{ "result": "white_wins" }
```

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📊 Cálculo de Rating ELO

El sistema usa la fórmula estándar de Elo:
- Rating inicial: 1200
- K-factor: 32 (por defecto)
- Se actualiza automáticamente tras cada partida

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
cd backend
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Sube la carpeta 'build' a Vercel o Netlify
```

## 🐛 Troubleshooting

### MongoDB no conecta
```bash
# Verifica que MongoDB esté ejecutándose
mongod

# O usa MongoDB Atlas (nube)
# Reemplaza en .env:
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/eborajedrez
```

### Puerto 5000 en uso
```bash
# Cambia en .env
PORT=5001
```

### CORS error
```bash
# Verifica en server.js que CLIENT_URL sea correcto
# Frontend debe estar en http://localhost:3000
```

## 📝 Licencia

MIT

## 👨‍💻 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Eborajedrez Club**
- 📧 Email: info@eborajedrez.club
- 🌐 Website: www.eborajedrez.club

## 🎯 Roadmap Futuro

- [ ] Análisis de partidas con engine de ajedrez
- [ ] Sistema de torneos
- [ ] App móvil (React Native)
- [ ] Espectadores en vivo
- [ ] Puzzles de ajedrez
- [ ] Sistema de amigos
- [ ] Notificaciones push
- [ ] Dark/Light mode
- [ ] Múltiples idiomas
- [ ] Leaderboards globales

---

**Hecho con ♞ por Eborajedrez Club**
