import { useState, useEffect, useRef } from 'react';
import './bottomSheet.css';

function BottomSheet({ children }) {
    const initialHeight = 20;
    const snapPoints = [initialHeight, window.innerHeight * 0.5, window.innerHeight * 0.8];
    
    const [sheetHeight, setSheetHeight] = useState(initialHeight);
    const isDragging = useRef(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(initialHeight);
    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
    const [lastY, setLastY] = useState(0);

    const contentRef = useRef(null);

    const handleDragStart = (e) => {
        e.preventDefault();
        isDragging.current = true;
        const clientY = e.touches?.[0].clientY || e.clientY;
        setStartY(clientY);
        setLastY(clientY);
        setStartHeight(sheetHeight);
    }

    const handleDragMove = (e) => {
        if(!isDragging.current) return;
        const clientY = e.touches?.[0].clientY || e.clientY;
        const moveY = startY - clientY;
        const deltaHeight = startHeight + moveY;
        const newHeight = Math.max(initialHeight, Math.min(deltaHeight, snapPoints[2]));
        setSheetHeight(newHeight);
        setLastY(clientY);
    }

    const handleDragEnd = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const finalHeight = snapPoints.reduce((prev, curr) => {
            return Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight) ? curr: prev;
        });
        setCurrentSnapIndex(snapPoints.indexOf(finalHeight))
        setSheetHeight(finalHeight);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('touchend', handleDragEnd);

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        }
    }, [handleDragMove, handleDragEnd]);

    return (
        <section className="bottomsheet" style={{ height: `${sheetHeight}px`}}>
            <div className="bottomsheet-header" onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
                <hr />
            </div>
            <div className='bottomsheet-body'>
                <div className='bottomsheet-body-content'>
                    { children }
                </div>
            </div>
        </section>
    )
}

export default BottomSheet;
