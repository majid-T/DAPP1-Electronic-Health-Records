# instruction on how to install chaincode on blockchain

## Below we will provide instructions on how to install your chain code on test-network of HLF

1. Starting network -- fabric-samples/test-network

```
./network.sh up -ca -s couchdb
```

1. Creating channel

```
 ./network.sh createChannel
```

1. Setting peer cli path

```
export PATH=${PWD}/../bin:$PATH
```

1. Setting environement for ORG1 or if we have my scripts run source envForOrg1.sh

```
export CORE_PEER_LOCALMSPID="Org1MSP"

export FABRIC_CFG_PATH=\$PWD/../config/

export CORE_PEER_TLS_ENABLED=true

export CORE_PEER_TLS_ROOTCERT_FILE=\${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

export CORE_PEER_MSPCONFIGPATH=\${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

export CORE_PEER_ADDRESS=localhost:7051
```

1. Packaging chain code

```
peer lifecycle chaincode package medical.tar.gz --path ../chaincode/medical/javascript/ --lang node --label medical
```

1. Installing on Org1

```
peer lifecycle chaincode install medical.tar.gz
```

1. Exporting package ID into env var

```
export CC_PACKAGE_ID= [output of install]
```

1. Approving for Org1

```
 peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name medical --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

1. Check commit readiness - should show one true one false

```
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name medical --version 1.0 --sequence 1 --tls --cafile \${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json
```

1. Setting environement for ORG2 or if we have my scripts run source envForOrg2.sh

```
export CORE_PEER_LOCALMSPID="Org2MSP"

export CORE_PEER_TLS_ROOTCERT_FILE=\${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

export CORE_PEER_MSPCONFIGPATH=\${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp

export CORE_PEER_ADDRESS=localhost:9051
```

1. Installing on Org2

```
peer lifecycle chaincode install medical.tar.gz
```

1. Approving for Org2

```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name medical --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

1. Check commit readiness - should show two true

```
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name medical --version 1.0 --sequence 1 --tls --cafile \${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json
```

1. Commit on network

```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name medical --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
```

1. Check commit result

```
peer lifecycle chaincode querycommitted --channelID mychannel --name medical --cafile \${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

1. Add Patient to network

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${
PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n medical --peerAddresses localho
st:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFil
es ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"createPatientRecord","Args":["TestPatient"]}'
```
