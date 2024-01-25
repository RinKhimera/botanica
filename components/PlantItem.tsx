type PlantItemProps = {
  name: string
  species: string
  waterNeeds: number
  frequency: number
}

const PlantItem = ({
  name,
  species,
  waterNeeds,
  frequency,
}: PlantItemProps) => {
  return (
    <div className="">
      {name} | {species} | {waterNeeds} | {frequency}
    </div>
  )
}

export default PlantItem
