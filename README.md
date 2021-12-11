# vue_study_trello

## 1. 구현 목표
1. json-server를 사용하여 api를 만들어보기
2. vuex를 사용한 상태관리
3. drag and drop 구현 (라이브러리 사용)
4. 우클릭 이벤트를 통한 커스텀 옵션 레이어 만들어보기

## 2. 화면 구성
1. 화면 구성
    1. 헤더
    2. 컨텐츠
       * 트렐로 상태그룹 (무한 생성)
       * 상태 그룹 아이템 (추가 삭제 수정)
       * 드래그앤드랍을 사용한 아이템 이동
       * 팝업의 데이터는 알아서 정하기  
    

2. 반응형 media 범위
   * 600 ~ 800
   * 800 ~ 1000
   * 1000 ~ 1200

## 3. Project Settings
1. vue
    * vue-cli 4.5.14
    * vue 2.x
    * vuex
2. prettier
3. eslint
4. Packages
    * axios
    * scss
        * node-sass@4.14.1
        * sass-loader@7.3.1
    * json-server
    * concurrently : vue와 json-server를 같이 구동하기 위해 설치
