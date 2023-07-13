import WalletConnectModal from "./components/WalletConnectModal";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["main-background"]}>
      <WalletConnectModal />
    </div>
  );
}

export default App;
