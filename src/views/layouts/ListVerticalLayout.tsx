import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

// ** MUI
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import List from '@mui/material/List'

// ** Component
import IconifyIcon from 'src/components/Icon'

// Config
import { verticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

const RecursiveListItems = ({ items, level, open }: { items: any; level: number; open: boolean }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Collapse all children
  useEffect(() => {
    if (!open) {
      Object.keys(openItems).forEach(key => {
        setOpenItems(prev => ({
          ...prev,
          [key]: false
        }))
      })
    }
  }, [open, openItems])

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              onClick={() => {
                if (item.children) handleClick(item.title)
              }}
              sx={{ padding: `8px 10px 8px ${level * 10}px` }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {item?.children && item?.children.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon
                      icon='ic:twotone-expand-less'
                      style={{
                        transform: 'rotate(180deg)'
                      }}
                    />
                  ) : (
                    <IconifyIcon icon='ic:twotone-expand-less' />
                  )}
                </>
              )}
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                <Collapse key={item.title} in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems items={item.children} level={level + 1} open={open} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems items={verticalItems} level={1} open={open} />
    </List>
  )
}

export default ListVerticalLayout
