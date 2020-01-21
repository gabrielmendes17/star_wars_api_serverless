resource "aws_dynamodb_table" "planets" {
  name = "${var.environment}-planets"
  hash_key = "id"
  attribute {
      name = "id"
      type = "S"
  }

  write_capacity = "${var.write_capacity}"
  read_capacity = "${var.read_capacity}"
}