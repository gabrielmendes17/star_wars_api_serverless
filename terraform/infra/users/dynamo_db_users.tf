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

resource "aws_ssm_parameter" "dynamodb_planets_table" {
  name = "${var.environment}-dynamodb-planets-table"
  type = "String"
  value = "${aws_dynamodb_table.planets.name}"
}