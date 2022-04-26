import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";

import useStyles from "./styles";

const Paginate = ({ page }) => {
  const {numberOfPage} = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(page){
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      page={Number(page) || 1}
      varient="outlined"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
