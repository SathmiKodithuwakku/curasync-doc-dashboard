import PatientProfile from '@/components/PatientProfile'

export default function PatientPage({ params }: { params: { id: string } }) {
  return <PatientProfile id={params.id} />
}