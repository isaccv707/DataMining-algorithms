import { NaiveBayes } from "./algorithms/NaiveBayes"
import { OneRule } from "./algorithms/OneRule"
import { ZeroRule } from "./algorithms/ZeroRule"


export const App = () => {
  return (
    <div className="flex justify-between items-start">
      <ZeroRule/>
      <OneRule/>
      <NaiveBayes/>
    </div>
  )
}
