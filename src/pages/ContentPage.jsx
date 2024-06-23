import IsRightTokenComponent from "../components/IsRightTokenComponent/IsRightTokenComponent"
import RolesComponent from "../components/RolesComponent"
import TokenComponent from "../components/TokenComponent/TokenComponent"


const ContentPage = () => {
  return (
    <main className="main">
      <RolesComponent/>
      <TokenComponent />
      <IsRightTokenComponent />
    </main>
  )
}

export default ContentPage