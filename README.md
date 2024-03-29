# LCK 종합정보 시스템

project execution period : 2022-04-25 ~

## Description
기존 LCK에서는 구축된 데이터베이스를 활용한 기록 관리 서비스는 제공이 되고 있으나 공식 홈페이지에서 관리하는 것이 아니라 전적검색, 커뮤니티와 같은 홈페이지에서 관리하고 있으며 예매 시스템은 인터파크에서 제공된다. 이러한 점을 보완하여 기록 관리, 회원 관리, 경기 관리, 예매관리 등을 위한 LCK 종합 정보시스템을 개발하고자 한다.


## Work Flow Chart
<img width="535" alt="업무흐름도1" src="https://user-images.githubusercontent.com/43203911/170084228-10567fe4-60f9-43a2-bc9f-267ce09761fb.png">

<img width="524" alt="업무흐름도2" src="https://user-images.githubusercontent.com/43203911/170084251-77992c9f-c408-41bf-ab18-d2c5716cd27f.png">

## List
1. Calender

일정을 등록, 수정, 삭제할 수 있는 페이지이다. 일정이 변화하는 것을 보기 위해 전체 일정을 한 눈에 볼 수 있게 Table 형식으로 보여준다.

2. record

경기 결과를 등록할 수 있는 페이지이다. 경기 결과 등록과 동시에 경기에 참여한 각 선수의 KDA도 등록해 주어야 한다. 상세 경기 결과를 보고 싶으면 경기의 Match번호를 입력하면 해당 경기 출전한 선수와 그 선수의 KDA를 확인할 수 있다. 경기 일정과 비슷하게 진행한 경기는 스코어로, 진행하지 않은 경기는 매치 번호와 날짜만 표시하여 테이블로 나타내준다.

3. Teaminf

팀을 등록, 삭제, 조회할 수 있는 페이지이다. 팀 순위에 대한 테이블도 확인할 수 있다.

4. playerinf

선수를 등록, 삭제, 수정, 조회할 수 있는 페이지이다. 선수의 특성에 따른 정렬로 선수 테이블이 있으며 User가 원하는 대로 정렬이 가능하게 했다.

5. Reservation

회원 가입, 조회, 삭제할 수 있는 기능과 예매 등록, 조회, 취소할 수 있는 기능이 있는 페이지이다.

## Stack
React.JS

Node.JS

MYSQL
