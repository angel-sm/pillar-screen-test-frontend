import { Center, Pagination as MatinePagination } from "@mantine/core";

interface Props {
  total: number;
  limit: number;
  setPage: (newPage: number) => void;
}

const Pagination = ({ limit, total, setPage }: Props) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <Center h={100}>
      <MatinePagination total={totalPages} onChange={setPage} mt="md" />
    </Center>
  );
};
export default Pagination;
