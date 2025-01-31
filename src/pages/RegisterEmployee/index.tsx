"use client";
import * as React from "react";
import { useContext, useEffect, useRef } from "react";


import Typography from "@mui/material/Typography";
import { AppContext } from "../../state";

import { Body } from './style';

import { IEmployee } from "../../interfaces";
import { ColumnWrapper } from "../../shared/style";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


function createData(
    name: string,
    calories: number,
    fat: string,
    carbs: number,
    protein: string,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Pedro Yago',1200000000, '02/10/1998', 24, 'Keley Borges'),
    createData('Rodrigo Burgos', 237,'02/10/1998', 37, 'Maria'),
    createData('Joao pedro', 262, '02/10/1998', 24, 'Joana'),
  
  ];

interface Item {
  nome: string;
  empresa: string;
  infracoes: boolean;
}

export default function ListarFunc() {
  const { state, dispatch } = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);  // Specify the type here
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);  // Specify the type here

  return (
    <Body>

    </Body>
  );
}


