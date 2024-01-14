import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Avatar, IconButton, SvgIcon } from "@mui/material";

const username = "Aryan";
export default function DashboardMenu() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		// <Stack direction="row" spacing={2}>
		<div>
			<Button
				disableRipple
				sx={{
					textTransform: "None",
					color: "secondary.light",
					fontWeight: 400,
					fontSize: "16px",
					transition: "none",
					"&:hover": {
						background: "none",
						color: "secondary.hover",
					},
				}}
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<Avatar
					sx={{
						width: "30px",
						height: "30px",
						mr: 2,
					}}
				>
					{username.at(0)}
				</Avatar>
				Hey {username}
				{open ? (
					<SvgIcon sx={{ ml: 1, height: "14px", width: "14px" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="16"
							viewBox="0 0 512 512"
						>
							<path
								fill="#ec5b24"
								d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
							/>
						</svg>
					</SvgIcon>
				) : (
					<SvgIcon sx={{ ml: 1, height: "14px", width: "14px" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="16"
							viewBox="0 0 512 512"
						>
							<path
								fill="#ec5b24"
								d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
							/>
						</svg>
					</SvgIcon>
				)}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom-start"
									? "left top"
									: "left bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									<MenuItem onClick={handleClose}>
										Profile
									</MenuItem>
									<MenuItem onClick={handleClose}>
										My account
									</MenuItem>
									<MenuItem onClick={handleClose}>
										Logout
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
		// </Stack>
	);
}
