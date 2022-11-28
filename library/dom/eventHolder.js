/**
 * 이벤트 핸들러를 중복없이 일괄 등록하기 위해 컴포넌트의 addEventHandler 메소드가 반환하는
 * event 객체 베열([{type: string, selector: string, handler: e => void}])을 임시 저장하는 배열이다.
 * Component#holdEvents에 의해 저장되고 render 함수가 호출되면 bindEventHandler 함수에 의해 이벤트가 등록된다.
 * @type {[{type: string, selector: string, handler: e => void}]}
 */
const eventHolder = [];
export default eventHolder;
