import { ConnectWallet, useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0xBDEf739Ca2B9B9747D130D4A4F9FF0CA68b4bd38";
  
  const { contract } = useContract(contractAddress);
  const { data: proposal, isLoading: proposalLoading } = useContractRead(contract,"proposals",0);
  const { data: hasVoted, isLoading: hasVotedLoading } = useContractRead(contract,"hasVoted",0,address);
  const { data: proposal1, isLoading: proposalLoading1 } = useContractRead(contract,"proposals",1);
  const { data: hasVoted1, isLoading: hasVotedLoading1 } = useContractRead(contract,"hasVoted",1,address);
  const { data: cannotVote, isLoading: cannotVoteLoading } = useContractRead(contract,"cannotVote",0,address);
  const { data: cannotVote1, isLoading: cannotVoteLoading1 } = useContractRead(contract,"cannotVote",1,address);
  const { data: canVote1, isLoading: canVoteLoading1 } = useContractRead(contract,"canVote",1,address);
  const { data: canVote, isLoading: canVoteLoading } = useContractRead(contract,"canVote",0,address);

  return (
    <div className={styles.container}>
      {/* <h1>Voting Dapp System</h1> */}
      <main className={styles.main}>
        <h1>Voting Dapp System</h1>
        <p>This is a voting system based on the Ethereum Blockchain technology and uploaded to the Polygon Mumbai network.</p>
          <ConnectWallet/>
        <div className={styles.card}>
          {/* <h2> : : </h2> */}
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
                        onSuccess={(result) => alert("You voted successfully")}
                        onError={(error) => alert("You do not have the authority to vote.")}
                      >Yes</Web3Button>
                      <br/>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",0,false)}
                        isDisabled={hasVoted}
                        onSuccess={(result) => alert("You voted successfully")}
                        onError={(error) => alert("You do not have the authority to vote.")}
                      >No</Web3Button>
                    </div>
                    <div>
                      {!hasVotedLoading && hasVoted ? (
                        <div>
                          <h3>Results: </h3>
                          <p>Yes : {proposal[1].toNumber()}</p>
                          <p>No : {proposal[2].toNumber()}</p>
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
        {/* ======================================================================================== */}
        <div className={styles.card}>
          {/* <h2> : : </h2> */}
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
                        onSuccess={(result) => alert("You voted successfully")}
                        onError={(error) => alert("You do not have the authority to vote.")}
                      >Yes</Web3Button>
                      <br/>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("vote",1,false)}
                        isDisabled={hasVoted1}
                        onSuccess={(result) => alert("You voted successfully")}
                        onError={(error) => alert("You do not have the authority to vote.")}
                      >No</Web3Button>
                    </div>
                    <div>
                      {!hasVotedLoading1 && hasVoted1 ? (
                        <div>
                          <h3>Results: </h3>
                          <p>Yes : {proposal1[1].toNumber()}</p>
                          <p>No : {proposal1[2].toNumber()}</p>
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
