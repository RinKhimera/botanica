import { findAllPlants } from "@/lib/action"
import PlantItem from "./PlantItem"

const PlantList = async () => {
  const allPlants = await findAllPlants()
  // console.log(allPlants)

  return (
    <div>
      {allPlants.map((plant) => (
        <PlantItem
          key={plant.id}
          name={plant.name}
          species={plant.species}
          waterNeeds={plant.waterNeeds}
          frequency={plant.frequency}
        />
      ))}
    </div>
  )
}

export default PlantList
