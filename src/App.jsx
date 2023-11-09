import "./App.css"
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import DefaultLayout from "./components/DefaultLayout"
import Login from "./screen/Login"
import "react-perfect-scrollbar/dist/css/styles.css"
import { useAuthentication } from "./providers/AuthenticationProvider"
import VirtualTryOn from "./screen/VirtualTryOn"

const App = () => {
  //! State
  const { islogged } = useAuthentication()
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (islogged) return redirect("/")
        return null
      },
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "virtual-try-on",
          element: <VirtualTryOn />,
        },
        {
          path: "*",
          loader: () => {
            const path = window.location.pathname
            if (path !== "virtual-try-on") {
              return redirect("/virtual-try-on")
            }

            return null
          },
        },
      ],
      loader: () => {
        if (!islogged) return redirect("/login")

        return null
      },
    },
  ])

  //! Function

  //! Render
  return <RouterProvider router={router} />
}

export default App
