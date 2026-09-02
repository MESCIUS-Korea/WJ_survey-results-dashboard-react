import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import useEvent from 'react-use-event-hook';
import * as wjInput from '@mescius/wijmo.react.input';
import { setLicenseKey } from '@mescius/wijmo';
import './style.css';

export default function AddNewPopup(props) {
  
  const addNewPopupRef = useRef(),
    dateObj = useRef(),
    workplaceObj = useRef(),
    departObj = useRef(),
    positionObj = useRef(),
    yearsOfServiceObj = useRef(),
    startDateObj = useRef(),
    qualificationStatusObj = useRef(),
    performanceRatingObj = useRef();

  const [newRowForm, setNewRowForm] = useState(null);

  const addNewRecord = useEvent(() => {
    if (addNewPopupRef.current) {
      setNullVal();
      addNewPopupRef.current.show(true, (sender) => {});
    }
  });
  const initCreateForm = useEvent((popup) => {
    setNewRowForm(popup);
    addNewPopupRef.current = popup;
  });

  const onSubmit = useEvent((e, popup) => {
    e.preventDefault();
    let form = e.target;

    let item = {
      index: props.grid.collectionView.sourceCollection.length + 1,
      int: form.int.value,
      name: form.name.value,
      birthDate: dateObj.current.control.value,
      department: departObj.current.control.selectedValue,
      position: positionObj.current.control.selectedValue,
      phone: form.phone.value,
      email: form.email.value,
      workplace: workplaceObj.current.control.value,
      yearsOfService: yearsOfServiceObj.current.control.value,
      startDate: startDateObj.current.control.value,
      qualificationStatus: qualificationStatusObj.current.control.selectedValue,
      performanceRating: performanceRatingObj.current.control.selectedValue,
    };

    // if (!view.getError(item, 'id')) {
    props.grid.collectionView.addNew(item);
    props.grid.collectionView.commitNew();

    popup.hide();
    // // reset the form and input value
    form.reset();

    // setNullVal();
  });

  const cancelBtnClicked = useEvent((e) => {
    e.preventDefault();
    addNewPopupRef.current.hide();

    document.querySelector('form').reset();

    setNullVal();
  });

  const setNullVal = () => {
    document.querySelector('form').reset();
    dateObj.current.control.value = null;
    departObj.current.control.selectedValue = null;
    positionObj.current.control.selectedValue = null;
    workplaceObj.current.control.selectedValue = null;
    yearsOfServiceObj.current.control.value = null;
    startDateObj.current.control.value = null;
    qualificationStatusObj.current.control.selectedValue = null;
    performanceRatingObj.current.control.selectedValue = null;
  };

  return (
    <div className="popup-container">
      <button class="addNewRecordBtn" onClick={addNewRecord}>
        + 새 행 추가
      </button>
      <wjInput.Popup
        className="new-record-popup"
        id="newRowForm"
        fadeIn={false}
        initialized={initCreateForm}
        shown={setNullVal}
      >
        <form onSubmit={(e) => onSubmit(e, newRowForm)}>
          <h3 className="modal-header">사원 정보 추가</h3>
          <div className="modal-body">
            <div class="row">
              <div class="col-md-4 col-sm-4 ">
                <label for="employeeName">
                  사원명<span className="mandatory-value-mark">*</span>
                </label>
                <input
                  id="employeeName"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div class="col-md-4 col-sm-4">
                <label for="employeeNum">
                  사원번호<span className="mandatory-value-mark">*</span>
                </label>
                <input
                  id="employeeNum"
                  name="int"
                  className="form-control"
                  required
                />
              </div>
              <div class="col-md-4 col-sm-4">
                <label for="thebirthDate">
                  생년월일 <span className="mandatory-value-mark">*</span>
                </label>
                <br />
                <wjInput.InputDate
                  ref={dateObj}
                  id="thebirthDate"
                  isRequired={true}
                  className="popup-inputs"
                ></wjInput.InputDate>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 col-sm-5">
                <label htmlFor="thePhone" for="phone">
                  전화번호 <span className="mandatory-value-mark">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>

              <div class="col-md-7 col-sm-7">
                <label for="email">
                  이메일 <span className="mandatory-value-mark">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  required
                  type="email"
                />
              </div>
            </div>
            <div class="row"></div>

            <hr />
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <label for="workplace">근무지명</label>
                <br />
                <wjInput.ComboBox
                  id="workplace"
                  className="popup-inputs"
                  ref={workplaceObj}
                  isRequired={false}
                  itemsSource={[
                    '서울',
                    '광주',
                    '대전',
                    '부산',
                    '대구',
                    '인천',
                    '울산',
                  ]}
                />
              </div>
              <div class="col-md-6 col-sm-6">
                <label for="depart">부서명</label>
                <br />
                <wjInput.ComboBox
                  id="depart"
                  selectedIndex={-1}
                  isRequired={false}
                  value={null}
                  ref={departObj}
                  className="popup-inputs"
                  itemsSource={[
                    '인사부',
                    '총무부',
                    '기획부',
                    '회계부',
                    '연구개발부',
                    '생상관리부',
                    '생산기술부',
                    '전산부',
                    '영업부',
                    '해외영업부',
                    '품질관리부',
                    '마케팅부',
                  ]}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <label for="position">직위명</label>
                <br />
                <wjInput.ComboBox
                  id="position"
                  selectedIndex={-1}
                  isRequired={false}
                  value={null}
                  ref={positionObj}
                  className="popup-inputs"
                  itemsSource={['사원', '대리', '과장', '차장', '부장']}
                />
              </div>
              <div class="col-md-6 col-sm-6">
                <label for="yearofservice">근속년도</label>
                <br />
                <wjInput.InputNumber
                  ref={yearsOfServiceObj}
                  isRequired={false}
                  value={null}
                  className="popup-inputs"
                  id="yearofservice"
                ></wjInput.InputNumber>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <label for="theDateEmploy">입사일자</label>
                <br />
                <wjInput.InputDate
                  ref={startDateObj}
                  isRequired={false}
                  value={null}
                  id="theDateEmploy"
                  className="popup-inputs"
                ></wjInput.InputDate>
              </div>
              <div class="col-md-4 col-sm-4">
                <label for="qualified">승급자격:</label>
                <br />
                <wjInput.ComboBox
                  ref={qualificationStatusObj}
                  selectedIndex={-1}
                  isRequired={false}
                  id="qualified"
                  value={null}
                  className="popup-inputs"
                  itemsSource={[true, false]}
                />
              </div>

              <div class="col-md-4 col-sm-4">
                <label for="performance">인사평가:</label>
                <br />
                <wjInput.ComboBox
                  ref={performanceRatingObj}
                  selectedIndex={-1}
                  isRequired={false}
                  value={null}
                  id="performance"
                  className="popup-inputs"
                  itemsSource={['A', 'B', 'C']}
                />
              </div>
            </div>
            <div class="row"></div>
          </div>
          <div className="modal-footer">
            <button id="submitBtn" className="btn btn-primary" type="submit">
              확인
            </button>
            <button
              id="cancelBtn"
              className="btn btn-primary"
              onClick={cancelBtnClicked}
            >
              취소
            </button>
          </div>
        </form>
      </wjInput.Popup>
    </div>
  );
}
