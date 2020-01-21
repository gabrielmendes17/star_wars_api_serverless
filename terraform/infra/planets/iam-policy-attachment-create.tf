resource "aws_iam_policy_attachment" "create_policy_attachment" {
  name       = "${var.environment}-create-attachment"
  roles      = ["${aws_iam_role.create_iam_role.name}"]
  policy_arn = "${aws_iam_policy.create_policy.arn}"
}
