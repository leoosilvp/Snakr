
const ModalConfirm = ({h1, h2, h3, btn1, btn2, onClick1, onClick2}) => {
    return (
        <section className="modal-confirm-ctn">
            <article className="modal-confirm">
                <div className="modal-confirm-content">
                    <h1>{h1}</h1>
                    <h2>{h2}</h2>
                    <h3>{h3}</h3>
                </div>
                <section className="modal-confirm-btn">
                    <button onClick={onClick1}>{btn1}</button>
                    <button onClick={onClick2} className="active">{btn2}</button>
                </section>
            </article>
        </section>
    )
}

export default ModalConfirm
