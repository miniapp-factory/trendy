import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function IdCard({ idNumber }: { idNumber: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My TRENDY ID</CardTitle>
        <CardDescription>
          {idNumber ? `ID #${idNumber}` : "Not minted yet"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
