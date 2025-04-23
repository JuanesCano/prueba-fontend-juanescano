##  Características

-  **Búsqueda en tiempo real** de usuarios por nombre o correo electrónico.
-  **Vista detallada** de cada usuario al seleccionarlo.
-  **Modo claro y oscuro** a nivel global mediante contexto (`ThemeContext`).
-  **Conexión a API** simulada para obtener usuarios, manejar errores y paginación.
-  **Navegación fluida** entre pantallas con React Navigation.
-  **Manejo de estado** con Redux Toolkit.

---

##  Estructura del proyecto

src/
│
├── components/
│   ├── UserList.tsx              # Renderiza la lista de usuarios
│   ├── UserInfoCard.tsx          # Muestra información detallada de un usuario
│   └── SearchBar.tsx             # Componente de barra de búsqueda
│
├── context/
│   └── ThemeContext.tsx          # Contexto global para tema claro/oscuro
│
├── hooks/
│   ├── reduxHooks.ts             # Hooks personalizados para Redux
│   └── useColorScheme.ts         # Manejo de esquemas de color
│
├── navigation/
│   └── RootNavigation.tsx        # Configuración de navegación principal
│
├── screens/
│   ├── Home/
│   │   └── index.tsx             # Pantalla principal (lista de usuarios)
│   └── UserDetails/
│       └── index.tsx             # Pantalla con detalles del usuario
│
├── store/
│   ├── slices/
│   │   └── usersSlice.ts         # Redux slice para manejo de usuarios
│   └── index.ts                  # Configuración del store global
│
└── types/
    ├── user.ts                   # Tipado para los datos de usuario
    └── navigation.ts             # Tipado de la navegación (React Navigation)



---

##  Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (>= 16)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- `npm`
- Un emulador Android/iOS

---

## 🛠️ Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/user-explorer-app.git
cd user-explorer-app

npm install

npm run start

y ahora conecta tu dispositivo 

---