import { arrow, offset, shift, useFloating, type Placement } from '@floating-ui/react-dom-interactions'
import React, { useRef, useState, useId } from 'react'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  content?: string
  placement?: Placement
  authentication?: boolean
}
export default function Popover({
  children,
  className,
  renderPopover,
  content,
  placement,
  authentication = true
}: Props) {
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div>
      <div
        content={content}
        className={className}
        ref={reference}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {authentication && (
                  <div>
                    <span
                      ref={arrowRef}
                      className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
                      style={{
                        position: 'absolute',
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y
                      }}
                    />
                    {renderPopover}
                  </div>
                )}
                {!authentication && <div></div>}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </div>
  )
}
