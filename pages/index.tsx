import { ConnectWallet, useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x3dE6c33921f117906c70FEd03DA6852b9F46F700";

  const { contract } = useContract(contractAddress);
  const { data: proposal, isLoading: proposalLoading } = useContractRead(contract,"proposals",0);
  const { data: hasVoted, isLoading: hasVotedLoading } = useContractRead(contract,"hasVoted",0,address);
  const { data: proposal1, isLoading: proposalLoading1 } = useContractRead(contract,"proposals",1);
  const { data: hasVoted1, isLoading: hasVotedLoading1 } = useContractRead(contract,"hasVoted",1,address);



  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <ConnectWallet/>
        <h1> Voting Dapp </h1>
        <div className={styles.card}>
          <h1>The first question</h1>
          <div>
            {address ? (
              <div>
                {proposalLoading ? (
                  <div>
                    <p>Loading proposal...</p>
                  </div>
                ) : (
                  <div>
                    <h2>{proposal[0]}</h2>
                    <div>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",0,true)}
                        isDisabled={hasVoted}
                      >Yes</Web3Button>
                      <br/>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",0,false)}
                        isDisabled={hasVoted}
                      >No</Web3Button>
                    </div>
                    <div>
                      {!hasVotedLoading && hasVoted ? (
                        <div>
                          <h3>Results: </h3>
                          <p>Yes: {proposal[1].toNumber()}</p>
                          <p>No: {proposal[2].toNumber()}</p>
                        </div>
                      ) : (
                        <div>
                          <p>You have not voted yet !  Results will show after you vote </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Connect your wallet to get started.</p>
              </div>
            )}
          </div>
        </div>
        {/* ===================================== */}
        <div className={styles.card}>
          <h1>second question</h1>
          <div>
            {address ? (
              <div>
                {proposalLoading1 ? (
                  <div>
                    <p>Loading proposal...</p>
                  </div>
                ) : (
                  <div>
                    <h2>{proposal1[0]}</h2>
                    <div>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",1,true)}
                        isDisabled={hasVoted1}
                      >Yes</Web3Button>
                      <br/>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",1,false)}
                        isDisabled={hasVoted1}
                      >No</Web3Button>
                    </div>
                    <div>
                      {!hasVotedLoading1 && hasVoted1 ? (
                        <div>
                          <h3>Results: </h3>
                          <p>Yes: {proposal1[1].toNumber()}</p>
                          <p>No: {proposal1[2].toNumber()}</p>
                        </div>
                      ) : (
                        <div>
                          <p>You have not voted yet !  Results will show after you vote </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Connect your wallet to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
