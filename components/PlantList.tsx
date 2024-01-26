import { findAllPlants } from "@/lib/action"
import PlantItem from "./PlantItem"

const PlantList = async () => {
  // Récupère toutes les plantes de manière asynchrone
  const allPlants = await findAllPlants()

  return (
    <div className="flex flex-col space-y-2">
      {allPlants.map((plant) => (
        <PlantItem
          key={plant.id}
          name={plant.name}
          species={plant.species}
          waterNeeds={plant.waterNeeds}
          frequency={plant.frequency}
          dateOfPurchase={plant.dateOfPurchase}
          watered={plant.watered}
          updatedAt={plant.updatedAt}
        />
      ))}
    </div>
  )
}

export default PlantList
