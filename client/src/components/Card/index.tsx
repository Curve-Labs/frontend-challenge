import { Card } from "antd";
import { TokenInput } from "../TokenInput";
// Import the tokens hook
import useTokens from "../../utils/useTokens";
import "../componentStyles/style.css";

const SwapComp = () => {
  // Get the list of all tokens
  const { tokens } = useTokens();
  return (
    <div className="card">
      <Card title="Swap" bordered={false} style={{ width: 300 }}>
        <TokenInput tokens={tokens} token={tokens[0].name} />
      </Card>
    </div>
  );
};
export default SwapComp;
