# PETOPIA
Deploy : https://petopia.info <br/>

## Description
<img src="https://user-images.githubusercontent.com/93478413/163529570-e03ec6ab-55ce-46ca-8d86-fdf85b014771.png" width="1000" />
기존의 SNS는 사용자가 게시물을 작성하면 그 데이터가 중앙화된 서버에 저장이 되지만,<br/>
PETOPIA는 사용자의 데이터 소유에 대한 web3 본질에 대해 생각하며, 작성된 게시물을 NFT로 발행하여 사용자가 직접 데이터를 소유할 수 있도록 개발하였습니다.<br/>
작성된 게시물들은 일반적인 SNS와 같이 다른 사용자들에게 공유되며 서로 좋아요와 댓글을 남기며 소통할 수 있습니다.<br/>
특히 사용자는 본인의 게시물이 좋아요를 받을 때마다 별도의 토큰을 지급 받습니다.<br/>
이렇게 지급 받은 토큰은 동물병원 예약에 사용할 수 있도록 명확한 토큰의 사용처를 마련해 놓았습니다.<br/>
이러한 토큰 이코노미를 통해 양육인들의 반려동물 진료비 부담을 경감해줄 뿐만 아니라,<br/>
이를 통해 반려동물들의 활발한 의료 서비스 이용을 촉진시켜 궁극적으로 반려동물의 건강 증진을 가져올 것으로 기대합니다.<br/>

## Stack
<img src="https://user-images.githubusercontent.com/93478413/163537724-f80ce164-6781-46d5-a544-f3eca486b175.png" width="1000" />
- Front-end : React, Javascript, Bootstrap <br/>
- Back-end : Mongoose, Caver, KAS, NodeJs', Express, IPFS <br/>
- Deploy : EC2, S3, Load balencer, Cloud Front, AWS Certificate Manager, Router53 <br/>
- Tool : Github, Notion, Discord <br/>

## Prerequisite
$ cd server/npm install <br/>
$ cd client/npm install <br/>

## Usage

### Run
$ cd server/npm start <br/>
$ cd client/npm start <br/>

### Login & Sign-Up
<img src="https://user-images.githubusercontent.com/93478413/163531669-bb2f50d5-adc0-405c-8042-58cf2f01d45f.gif" width="1000" />
- 카이카스 지갑을 통해 로그인 및 회원가입을 할 수 있습니다.<br/>
- 별도의 회원가입 절차 없이 Back-end에서 회원가입 프로세스가 진행되기 때문에 지갑 연결만을 통해 바로 서비스를 이용할 수 있으며, 최초 지갑 접속시 유저네임은 지갑주소로 설정됩니다.<br/>
- 회원정보 수정은 마이페이지에서 가능합니다.<br/>

### Posting(NFT Minting)
<img src="https://user-images.githubusercontent.com/93478413/163531660-7e39e9f8-37b4-4894-928a-81787c4810bd.gif" width="1000" />
- 사용자가 게시물 작성시 업로드한 이미지와 텍스트를 Infura IPFS API를 통해 METADATA로 생성하고 사용자의 지갑으로 NFT Mint 요청을 보냅니다.<br/>
- 사용자가 승인을 하면 해당 지갑으로 NFT(KIP-17)이 발행됩니다. 발행된 NFT의 TOKEN ID를 DB에 저장합니다.<br/>
- 사용자는 게시물을 업로드하여 반려동물과의 소중한 추억을 SNS에 공유할 수 있을 뿐만 아니라 NFT로 기록되어 자신이 소유한 데이터로 영원히 간직할 수 있습니다.<br/>

### Read Post
<img src="https://user-images.githubusercontent.com/93478413/163531664-357ec1e5-f1d2-4e83-a33d-41dc81c9f60d.gif" width="1000" />
- 사용자가 작성 게시물의 정보를 DB에 요청하고 DB의 TOKEN ID와 KIP-17을 배포한 컨트랙트의 TOKEN LIST와 비교하여 일치하는 정보를 읽어옵니다<br/>
- 사용자가 게시물을 삭제하여도 DB에서만 삭제될 뿐 자신의 지갑에 NFT를 보유하여 영원히 자신의 소유의 데이터로 보존할 수 있습니다.<br/>
- 게시물 조회는 메인페이지에서 전체 게시물 목록과 사용자가 팔로우한 계정의 게시물 목록을 분리하여 조회할 수 있습니다.<br/>
- 각각 마이페이지와 유저페이지에서도 상세보기를 통해 게시물 정보를 조회할 수 있습니다.<br/>

### Like(Get PETO TOKEN)
<img src="https://user-images.githubusercontent.com/93478413/163531655-3a412211-e60b-4604-8c89-cea826d3a1be.gif" width="1000" />
- PETOPIA 구성원들은 SNS에 업로드된 게시물을 통해 서로의 반려동물과의 소중한 일상을 공유하며, 좋아요와 댓글/대댓글 기능으로 소통할 수 있습니다.<br/>
- 특히 좋아요 기능은 병원 예약에 사용할 수 있는 PETO TOKEN을 지급받을 수 있는 수단으로 구성원들의 적극적인 서비스 이용할 기대할 수 있습니다.<br/>
- 사용자가 작성한 게시물에서 다른 사용자들에게 좋아요를 얻을 때 마다 일정 수량의 PETO TOKEN을 관리자 계정을 통해 지급 받습니다.<br/>
- 지급받은 PETO TOKEN의 내역은 마이페이지에서 확인할 수 있으며 메디컬 페이지에서 병원 예약 서비스에 사용할 수 있습니다.<br/>

### Animal Medical Resevation
<img src="https://user-images.githubusercontent.com/93478413/163531666-a1939056-840d-46b6-8233-82ee7e5d9c34.gif" width="1000" />
- 사용자는 메디컬 서비스 페이지에서 병원 목록 중에 원하는 병원을 선택하고 예약이 가능한 시간대를 선택해서 병원 예약을 할 수 있습니다.<br/>
- 예약을 완료하면 사용자의 지갑에서 해당 병원의 지갑으로 별도로 정해진 수량의 PETO TOKEN이 전송됩니다.<br/>
- 예약 현황은 마이페이지에서 확인 가능합니다.<br/>
