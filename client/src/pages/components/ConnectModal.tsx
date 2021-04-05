import { CloseCircleOutlined } from '@ant-design/icons';
import React, { ReactChild, useEffect, useState, useRef } from 'react';

type Props = {
    visible: boolean;
    onCancel: Function;
    title?: string;
    children: ReactChild;
};

function ConnectModal(props: Props) {
    const modalbody = useRef<HTMLDivElement>(null);

    const [open, setopen] = useState('');
    const [show, setshow] = useState('');
    const [content, setcontent] = useState('');

    function closeModal(e: any) {
        if (show.length > 0 && modalbody.current && !modalbody.current.contains(e.target)) {
            props.onCancel();
        }
    }

    useEffect(() => {
        if (props.visible) {
            setopen('open');
            setTimeout(() => {
                setshow('show');
                setcontent('open');
            }, 100);
        } else {
            setcontent('');
            setshow('');
            setTimeout(() => {
                setopen('');
            }, 500);
        }
        // eslint-disable-lint
    }, [props.visible]);

    useEffect(() => {
        if (content.length > 0) {
            document.body.classList.add('body-no-overflow');
        } else {
            document.body.classList.remove('body-no-overflow');
        }
    });

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => {
            document.removeEventListener('mousedown', closeModal);
        };
    });

    return (
        <div className={`modal-styles ${open}`}>
            <div className={`modal-body ${show}`}>
                <div>
                    <div className={`modal-content ${content}`} ref={modalbody}>
                        <div className="flex justify-space-between align-center">
                            <div className="title font18" style={{ fontWeight: 500 }}>
                                {props.title}
                            </div>
                            <div onClick={() => props.onCancel()} className="close-modal">
                                <CloseCircleOutlined />
                            </div>
                        </div>
                        <hr />
                        <div>{props.children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectModal;
